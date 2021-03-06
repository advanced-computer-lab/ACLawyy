import { useEffect, useState } from "react";
import popupStyles from "./FlightsSummary.css";
import FlightCard from "../FlightCard/FlightCard";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Link from "@mui/material/Link";
import { ReactSession } from "react-client-session";
const calculatePrice = (flight, cabin) => {
  if (cabin == "first") return 2 * flight.EconomyPrice;
  if (cabin == "business") return 1.5 * flight.EconomyPrice;
  return flight.EconomyPrice;
};

function FlightsSummary(props) {
  const { flight1, cabin1, flight2, cabin2, adults, children, u } = props;
  const price1 = calculatePrice(flight1, cabin1);
  const price2 = calculatePrice(flight2, cabin2);
  const [user, setUser] = useState();
  //const userID = props.userID;
  const userID = ReactSession.get("id");

  useEffect(() => {
    axios
      .post("http://localhost:8000/Users/getUserDetails", {
        UserID: userID,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        alert("error");
      });
  }, []);

  const sendMail = () => {
    const obj = {
      email: user.Email,
      subject: "Itinerary",
      text:
        "Dear " +
        user.FirstName +
        ",\n" +
        "You booked " +
        adults +
        " adult ticket and " +
        children +
        " child tickets from " +
        flight1.DepartureCity +
        " to " +
        flight1.ArrivalCity +
        " and back\n" +
        "The flight leaves on " +
        flight1.DepartureDate +
        " at " +
        flight1.DepartureTime +
        " From " +
        flight1.DepartureAirport +
        " Airport and you will arrive at " +
        flight1.ArrivalAirport +
        " Airport\n" +
        "Your total booking cost is " +
        (price1 + price2) +
        " $.\n" +
        "We wish you safe travels.\n" +
        "Flights awyy;)",
    };

    axios
      .post("http://localhost:8000/Tickets/email", obj)
      .then((res) => {
        alert(
          "Please check your email, the details of your flight have been sent."
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const confirmPurchase = () => {
    confirmPurchase2();
  };
  const confirmPurchase2 = () => {
    const adultTicket = {
      UserID: userID,
      AwayFlight: flight1._id,
      ReturnFlight: flight2._id,
      AwayCabin: cabin1,
      AwaySeat: -1,
      ReturnSeat: -1,
      ReturnCabin: cabin2,
      AwayPrice: price1,
      ReturnPrice: price2,
      Type: "Adult",
    };
    const childTicket = {
      UserID: userID,
      AwayFlight: flight1._id,
      ReturnFlight: flight2._id,
      AwayCabin: cabin1,
      AwaySeat: -1,
      ReturnSeat: -1,
      ReturnCabin: cabin2,
      AwayPrice: price1 / 2,
      ReturnPrice: price2 / 2,
      Type: "Child",
    };
    console.log(adultTicket);
    const flight1update = { _id: flight1._id };
    if (cabin1 === "first")
      flight1update.FirstClassSeats =
        flight1.FirstClassSeats - (parseInt(adults) + parseInt(children));
    if (cabin1 === "business")
      flight1update.BusinessClassSeats =
        flight1.BusinessClassSeats - (parseInt(adults) + parseInt(children));
    else
      flight1update.EconomyClassSeats =
        flight1.EconomyClassSeats - (parseInt(adults) + parseInt(children));

    const flight2update = { _id: flight2._id };
    if (cabin1 === "first")
      flight2update.FirstClassSeats =
        flight2.FirstClassSeats - (parseInt(adults) + parseInt(children));
    if (cabin1 === "business")
      flight2update.BusinessClassSeats =
        flight2.BusinessClassSeats - (parseInt(adults) + parseInt(children));
    else
      flight2update.EconomyClassSeats =
        flight2.EconomyClassSeats - (parseInt(adults) + parseInt(children));

    const tickets = [];
    for (let i = 0; i < adults; i++) {
      tickets.push(adultTicket);

      axios
        .post("http://localhost:8000/Tickets/CreateTicket", adultTicket)
        .then((res) => {
          if (i == adults - 1) {
            if (children == 0) {
              axios
                .post("http://localhost:8000/Tickets/findMyTickets", {
                  UserID: userID,
                  AwayFlight: flight1._id,
                  ReturnFlight: flight2._id,
                })
                .then((res) => {
                  const mongotickets = res.data;

                  const mongotickets2 = mongotickets.slice(
                    0,
                    parseInt(adults) + parseInt(children)
                  );
                  const purchaseBody = {
                    UserID: userID,
                    NumberOfTickets: parseInt(adults) + parseInt(children),
                    TotalPrice:
                      (children * price1) / 2 +
                      (children * price2) / 2 +
                      adults * price1 +
                      adults * price2,
                    Tickets: mongotickets2,
                    Paid: false,
                  };
                  axios
                    .post(
                      "http://localhost:8000/Tickets/CreatePurchase",
                      purchaseBody
                    )
                    .then((res) => {
                      axios
                        .post(
                          "http://localhost:8000/flights/updateflight",
                          flight1update
                        )
                        .then((res) => {
                          axios
                            .post(
                              "http://localhost:8000/flights/updateflight",
                              flight2update
                            )
                            .then((res) => {})
                            .catch(() => {
                              alert("error");
                            });
                          sendMail();
                          window.location.href = `/payment/${JSON.stringify(
                            purchaseBody
                          )}`;
                        })
                        .catch(() => {
                          alert("error");
                        });
                    })
                    .catch((e) => {
                      alert("error");
                    });
                })
                .catch((e) => {
                  alert("error");
                });
            }
            for (let j = 0; j < children; j++) {
              tickets.push(childTicket);

              axios
                .post("http://localhost:8000/Tickets/CreateTicket", childTicket)
                .then((res) => {
                  if (j == children - 1) {
                    axios
                      .post("http://localhost:8000/Tickets/findMyTickets", {
                        UserID: userID,
                        AwayFlight: flight1._id,
                        ReturnFlight: flight2._id,
                      })
                      .then((res) => {
                        const mongotickets = res.data;

                        const mongotickets2 = mongotickets.slice(
                          0,
                          parseInt(adults) + parseInt(children)
                        );
                        const purchaseBody = {
                          UserID: userID,
                          NumberOfTickets:
                            parseInt(adults) + parseInt(children),
                          TotalPrice:
                            (children * price1) / 2 +
                            (children * price2) / 2 +
                            adults * price1 +
                            adults * price2,
                          Tickets: mongotickets2,
                          Paid: false,
                        };
                        axios
                          .post(
                            "http://localhost:8000/Tickets/CreatePurchase",
                            purchaseBody
                          )
                          .then((res) => {
                            axios
                              .post(
                                "http://localhost:8000/flights/updateflight",
                                flight1update
                              )
                              .then((res) => {
                                axios
                                  .post(
                                    "http://localhost:8000/flights/updateflight",
                                    flight2update
                                  )
                                  .then((res) => {})
                                  .catch(() => {
                                    alert("error");
                                  });
                                sendMail();
                                window.location.href = `/payment/${JSON.stringify(
                                  purchaseBody
                                )}`;
                              })
                              .catch(() => {
                                alert("error");
                              });
                          })
                          .catch((e) => {
                            alert("error");
                          });
                      })
                      .catch((e) => {
                        alert("error");
                      });
                  }
                })
                .catch((e) => {
                  alert("error");
                });
            }
          }
        })
        .catch((e) => {
          alert("error");
        });
    }
  };

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
      <Stack direction="row" justifyContent="center">
        <Button
          variant="outlined"
          disabled={ReactSession.get("userType") != "1"}
          onClick={confirmPurchase}
        >
          <h4>Reserve</h4>
        </Button>
      </Stack>
      {ReactSession.get("userType") != "1" && (
        <Alert severity="warning">
          You must{" "}
          <Link href="http://localhost:3000/login" variant="body2">
            Sign in
          </Link>{" "}
          to reserve the flights{" "}
        </Alert>
      )}
    </div>
  );
}

export default FlightsSummary;
