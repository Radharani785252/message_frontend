import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  Input,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BulkMessage() {
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const addPhoneNumber = () => {
    if (to) {
      setPhoneNumbers([...phoneNumbers, to]);
      setTo(""); // Clear the input after adding
    }
  };

  const removePhoneNumber = (number) => {
    const updatedNumbers = phoneNumbers.filter((n) => n !== number);
    setPhoneNumbers(updatedNumbers);
  };

  const sendBulkSMS = async () => {
    try {
      const response = await fetch(
        "https://message-y4ck.onrender.com/sendbulksms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numbers: phoneNumbers, body }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponse(data.message);
        toast.success("Bulk SMS sent successfully!", { autoClose: 3000 });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      

    } catch (error) {
      console.error(error.error);
      toast.error("Failed to send bulk SMS. Please try again.", {
        autoClose: 3000,
      });
       setResponse("Failed to send bulk SMS");
    }
  };
  const handleReset=()=>{
    setBody("")
    setResponse("")
    setPhoneNumbers([])
  }
  
    useEffect(() => {
      toast.success("welcome.", { autoClose: 3000 });
    }, []);
  return (
    <Container>
      <ToastContainer />
      <h1 className="mt-3">Bulk SMS</h1>
      <Row style={{ marginTop: "20px" }}>
        <Col md="6">
          <Card>
            <CardHeader>Add Phone Number</CardHeader>
            <CardBody>
              <div className="input-group mb-3">
                <Input
                  type="text"
                  placeholder="Enter a phone number"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
                <div className="input-group-append">
                  <Button color="primary" onClick={addPhoneNumber}>
                    Add Number
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md="6">
          <Card>
            <CardHeader>Phone Numbers</CardHeader>
            <CardBody>
              <ListGroup>
                {phoneNumbers.map((number, index) => (
                  <ListGroupItem key={index}>
                    {number}{" "}
                    <Button
                      color="danger"
                      size="sm"
                      className="ml-2"
                      onClick={() => removePhoneNumber(number)}
                    >
                      Remove
                    </Button>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px", justifyContent: "center" }}>
        <Col md="6">
          <Card>
            <CardHeader>Message</CardHeader>
            <CardBody>
              <Input
                type="textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Button color="primary" className="m-3" onClick={sendBulkSMS}>
        Send Bulk SMS
      </Button>
      <Button color="info" className="m-3" onClick={handleReset}>
        Reset
      </Button>
      <div className="mt-3">
        <p>{response}</p>
      </div>
    </Container>
  );
}

export default BulkMessage;
