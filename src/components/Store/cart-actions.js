import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-https-ab8e8-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = await response.json();

      return data;
    };
    try {
      const cartData = await fetchData();
    } catch (error) {
        dispatch(
            uiActions.showNotificaiton({
              status: "error",
              title: "Error!",
              message: "Fetching Cart data failed!",
            })
          );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotificaiton({
        status: "pending",
        title: "sending...",
        message: "Sending Cart data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-https-ab8e8-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotificaiton({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotificaiton({
          status: "error",
          title: "Error!",
          message: "Sending Cart data failed!",
        })
      );
    }
  };
};
