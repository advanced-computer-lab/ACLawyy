import { useEffect, useState } from "react";

import FlightCard from "../../FlightCard/FlightCard";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import axios from "axios";

const calculatePrice = (flight, cabin) => {
  if (cabin == "first") return 2 * flight.EconomyPrice;
  if (cabin == "business") return 1.5 * flight.EconomyPrice;
  return flight.EconomyPrice;
};

function PurchaseSummary(props) {
  const { flight1, cabin1, flight2, cabin2, adults, children, u } = props;
  const price1 = calculatePrice(flight1, cabin1);
  const price2 = calculatePrice(flight2, cabin2);

  const userID = props.userID;


  return (
    <div className="container2">
      <h2 className="title">Summary</h2>
      <Stack direction="row" spacing={1} justifyContent="center">
        <div>
          <FlightCard
            cabin={cabin1}
            flight={flight1}
            onClick={() => {
              return;
            }}
            isSelected={() => {
              return false;
            }}
            perm={true}
            className="elem"
          />
          <h3>Away Price</h3>
          <div>
            {[...Array(parseInt(adults))].map((e, i) => (
              <PermIdentityIcon key={i} />
            ))}
            <h4>
              {" "}
              {adults} * {price1} = {adults * price1} $
            </h4>
          </div>
          <div>
            {[...Array(parseInt(children))].map((e, i) => (
              <ChildCareIcon key={i} />
            ))}
            {parseInt(children) > 0 && (
              <h4>
                {" "}
                {children} * {price1 / 2} = {(children * price1) / 2} $
              </h4>
            )}
            <h3>
              Total Price :{" "}
              {(children * price1) / 2 +
                (children * price2) / 2 +
                adults * price1 +
                adults * price2}{" "}
              $
            </h3>
          </div>
        </div>

        <div>
          <FlightCard
            cabin={cabin2}
            flight={flight2}
            onClick={() => {
              return;
            }}
            isSelected={() => {
              return false;
            }}
            perm={true}
            className="elem"
          />
          <h3>Return Price</h3>
          <div>
            {[...Array(parseInt(adults))].map((e, i) => (
              <PermIdentityIcon key={i} />
            ))}
            <h4>
              {" "}
              {adults} * {price2} = {adults * price2} $
            </h4>
          </div>
          <div>
            {[...Array(parseInt(children))].map((e, i) => (
              <ChildCareIcon key={i} />
            ))}
            {parseInt(children) > 0 && (
              <h4>
                {" "}
                {children} * {price2 / 2} = {(children * price2) / 2} $
              </h4>
            )}
          </div>
        </div>
      </Stack>
    </div>
  );
}

export default PurchaseSummary;
