import StripeCheckout from "react-stripe-checkout";
import {React, useState} from "react";
import { Button } from "@mui/material";

export default function Payment () { 
    const [product,setProduct] =useState({
        name:"Pay for reservation",
        price: "10",
        Productby:"ACLawyyy ;)"
        })

        return(

<div>
    <StripeCheckout 
    stripeKey = "pk_test_51K8BI2DXNkUn4YuszggmHAuUflW7oYdM1B6qTgSdkKwBMSnbmbYfUIWREOch2oSPLkCOmOsldOkvW6am99Dc3skq00Xux5d3q4"
    token=""
    name=""
    >
        <Button style={{
            backgroundcolor:"pink",
            fontSize:"15px",
            marginTop:"100px"
        }}>
        Make Payment
        </Button>
    </StripeCheckout> 
    </div>      )
     }
     