import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Logs from "./Logs";

const Homepage = () => {
  const [gitURL, setGitURL] = useState("");
  const [slug, setSlug] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:9000/project", {
      gitURL: gitURL,
      slug: slug,
    });
    setSlug(res.data.data.projectSlug);
    setURL(res.data.data.url);
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  return (
    <div>
      {url === "" && (
        <Form className="form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginBottom: "0.1rem" }}>
              Github Link
            </Form.Label>
            <Form.Control
              type="text"
              value={gitURL}
              onChange={(e) => {
                setGitURL(e.target.value);
              }}
              placeholder="https://github.com/username/project-name"
            />
            <Form.Label>Subdomain</Form.Label>
            <Form.Control
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
              }}
              placeholder="Subdomain"
            />
          </Form.Group>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}

      {url !== "" && (
        <>
          <div className="link-container">
            <h6>
              Project URL -&nbsp;
              <a href={url} onClick={handleClick}>
                {url}
              </a>
            </h6>
          </div>

          <Logs slug={slug}></Logs>
        </>
      )}
    </div>
  );
};

export default Homepage;
