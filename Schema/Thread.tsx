import * as yup from "yup";

const content = yup.object({
  content: yup.string().min(20),
});
export default content;
