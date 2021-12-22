import StripeCheckout from "react-stripe-checkout";
import { React, useState } from "react";
import { Button, TableBody } from "@mui/material";
import { Container } from "@mui/material";
const axios = require("axios").default;
const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "pk_test_51K8BI2DXNkUn4YuszggmHAuUflW7oYdM1B6qTgSdkKwBMSnbmbYfUIWREOch2oSPLkCOmOsldOkvW6am99Dc3skq00Xux5d3q4"
);
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "flightsawy@outlook.com",
    pass: "ACLawyyy",
  },
});
const options = {
  from: "flightsawy@outlook.com",
  to: "mohamedeltantawi0@gmail.com",
  subject: "Email trial",
  text: "Let's see",
};
function PaymentComponent(props) {
  // const [product, setProduct] = useState({
  //   name: "Pay for reservation",
  //   price: "4000",
  //   Productby: "cloud9",
  // });
  const product = props.product;

  const pay = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // axios
    //   .post("http://localhost:8000/Tickets/payment", {
    //     method: "POST",
    //     headers,
    //     body: body,
    //   })
    //   .then((response) => {
    //     console.log("MABROOOOOK");
    //     const { status } = response;

    //     console.log("STATUS");
    //   })
    //   .catch((error) => console.log("GIRL FE MASHAKEL" + error));

    axios
      .post("http://localhost:8000/Tickets/payment", {
        token,
        product,
      })
      .then((res) => {
        console.log("payment succ");
        window.location.href = "/reservedflights";
      })
      .catch(() => {
        alert("error");
      });
  };
  return (
    <Container>
      <StripeCheckout
        stripeKey="pk_test_51K8BI2DXNkUn4YuszggmHAuUflW7oYdM1B6qTgSdkKwBMSnbmbYfUIWREOch2oSPLkCOmOsldOkvW6am99Dc3skq00Xux5d3q4"
        token={pay}
        name=""
        amount={product.price + "00"}
        backgroundcolor="purple"
        currency="USD"
      >
        <Button
          style={{
            backgroundcolor: "pink",
            fontSize: "15px",
          }}
        >
          Make Payment
        </Button>
      </StripeCheckout>
    </Container>
  );
}
export default PaymentComponent;
