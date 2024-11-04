import * as yup from "yup";

const schema = yup.object({
  imageUrl: yup.string().required(),
  username: yup.string().required().min(3),
  bio: yup.string().required().min(20),
});

export default schema;
