declare module 'khalti-checkout-web' {
    interface KhaltiEventHandlers {
      onSuccess: (payload: KhaltiSuccessPayload) => void;
      onError: (error: KhaltiErrorPayload) => void;
    }
  
    interface KhaltiSuccessPayload {
      token: string;
      amount: number;
      productIdentity: string;
      productName: string;
      productUrl: string;
      // Add more fields if needed
    }
  
    interface KhaltiErrorPayload {
      message: string;
      // Add more fields based on the error response structure
    }
  
    interface KhaltiCheckoutOptions {
      publicKey: string;
      productIdentity: string;
      productName: string;
      productUrl: string;
      eventHandler: KhaltiEventHandlers;
      paymentPreference?: string[];
      // Add other optional fields if needed
    }
  
    export default class KhaltiCheckout {
      constructor(config: KhaltiCheckoutOptions);
      show(options: { amount: number }): void;
    }
  }
  