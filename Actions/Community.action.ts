"use server";

import { FilterQuery, SortOrder } from "mongoose";

import User from "@/DB/Model/User";
import Community from "@/DB/Model/Community";
import Thread from "@/DB/Model/Thread";
import { connectToDatabase } from "@/DB/Connection";
import { CreateCommunity } from "@/Types";
import { HandleError } from "@/lib/Error";

export async function createCommunity(data: CreateCommunity) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ kindeID: data.createdById });
    if (!user) {
      throw new Error("User not found");
    }
    const newCommunity = new Community(data);
    const createdCommunity = await newCommunity.save();
    user.communities.push(createdCommunity._id);
    await user.save();
    return createdCommunity;
  } catch (error) {
    HandleError(error);
  }
}

export async function fetchCommunityDetails(id: string) {
  try {
    await connectToDatabase();
    const communityDetails = await Community.findOne({ id }).populate([
      "createdBy",
      {
        path: "members",
        model: User,
        select: "name username image _id id",
      },
    ]);
    return communityDetails;
  } catch (error) {
    HandleError(error);
  }
}

export async function fetchCommunityPosts(id: string) {
  try {
    await connectToDatabase();

    const communityPosts = await Community.findById(id).populate({
      path: "threads",
      model: Thread,
      // populate: [
      //   {
      //     path: "author",
      //     model: User,
      //     select: "name image id", // Select the "name" and "_id" fields from the "User" model
      //   },
      //   {
      //     path: "children",
      //     model: Thread,
      //     populate: {
      //       path: "author",
      //       model: User,
      //       select: "image _id", // Select the "name" and "_id" fields from the "User" model
      //     },
      //   },
      // ],
    });

    return communityPosts;
  } catch (error) {
    HandleError(error);
  }
}

export async function fetchCommunities({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    await connectToDatabase();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof Community> = {};
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }
    const sortOptions = { createdAt: sortBy };
    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");
    const totalCommunitiesCount = await Community.countDocuments(query);
    const communities = await communitiesQuery.exec();
    const isNext = totalCommunitiesCount > skipAmount + communities.length;
    return { communities, isNext };
  } catch (error) {
    HandleError(error);
  }
}

export async function addMemberToCommunity(
  communityId: string,
  memberId: string
) {
  try {
    await connectToDatabase();
    const community = await Community.findOne({ id: communityId });
    if (!community) {
      throw new Error("Community not found");
    }
    const user = await User.findOne({ kindeID: memberId });
    if (!user) {
      throw new Error("User not found");
    }
    if (community.members.includes(user._id)) {
      throw new Error("User is already a member of the community");
    }
    community.members.push(user._id);
    await community.save();
    return community;
  } catch (error) {
    HandleError(error);
  }
}

export async function removeUserFromCommunity(
  userId: string,
  communityId: string
) {
  try {
    await connectToDatabase();

    const userIdObject = await User.findOne({ kindeID: userId }, { _id: 1 });
    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    if (!userIdObject) {
      throw new Error("User not found");
    }

    if (!communityIdObject) {
      throw new Error("Community not found");
    }
    await Community.updateOne(
      { _id: communityIdObject._id },
      { $pull: { members: userIdObject._id } }
    );
    await User.updateOne(
      { _id: userIdObject._id },
      { $pull: { communities: communityIdObject._id } }
    );
    return { success: true };
  } catch (error) {
    HandleError(error);
  }
}

export async function updateCommunityInfo(
  communityId: string,
  name: string,
  slug: string,
  image: string
) {
  try {
    await connectToDatabase();
    const updatedCommunity = await Community.findOneAndUpdate(
      { id: communityId },
      { name, slug, image }
    );
    if (!updatedCommunity) {
      throw new Error("Community not found");
    }
    return updatedCommunity;
  } catch (error) {
    HandleError(error);
  }
}

export async function deleteCommunity(communityId: string) {
  try {
    await connectToDatabase();
    const deletedCommunity = await Community.findOneAndDelete({
      id: communityId,
    });
    if (!deletedCommunity) {
      throw new Error("Community not found");
    }
    await Thread.deleteMany({ community: communityId });
    const communityUsers = await User.find({ communities: communityId });
    const updateUserPromises = communityUsers.map((user) => {
      user.communities.pull(communityId);
      return user.save();
    });
    await Promise.all(updateUserPromises);
    return deletedCommunity;
  } catch (error) {
    HandleError(error);
  }
}
