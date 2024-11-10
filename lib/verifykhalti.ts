import axios from "axios";

export const verifyKhaltiPayment = async (token: string, amount: number) => {
  try {
    const khaltiVerification = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      {
        token,
        amount, // Amount should be in paisa (100x the original price)
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (khaltiVerification.data.state.name === "Completed") {
      return { success: true, data: khaltiVerification.data };
    } else {
      return { success: false, message: "Payment verification failed", data: khaltiVerification.data };
    }
  } catch (error) {
    console.error("Khalti verification error:", error);
    return { success: false, message: "Internal server error" };
  }
};
