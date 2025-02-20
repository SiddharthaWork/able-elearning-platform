import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp
  appearance={{
    elements: {

      socialButtonsBlockButton: {
        display: "none",
      },
      // Hide the entire social buttons block
      socialButtonsBlock: {
        display: "none",
      },

      dividerRow : {
        display: "none",
      },



    }}}
  
  
           {*Here is some changes *}
  
  />;
}
