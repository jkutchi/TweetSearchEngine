import Select from 'react-select';
import React, { useState } from 'react';
import "./AdvancedSearchPanel.css";
import {Form, Row, Col, Button} from "react-bootstrap";
import Chips from "react-chips";
import axios from "axios";
import Autocomplete from 'react-autocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdvancedSearchPanel() {

    const sentiments = [
        { value: "POSITIVE", label: "Positive" },
        { value: "NEGATIVE", label: "Negative" }
    ];

    const [selectedSentiment, setSelectedSentiment] = useState("");
    const [topics, setTopics] = useState([]);
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    function fetchLocations(e) {
        const host = window.location.hostname;
        const port1 = 3000;
        const port2 = 5000;
        setLocation(e.currentTarget.value);

        if (e.currentTarget.value === "") {
            setLocations([]);
        } else {
            axios.get(`http://${host}:${port2}/advancedSearch/%20/%20/${e.currentTarget.value}/%20/%20/%20`).then((res) => {
            setLocations(res.data);
        });
        }
    }

    function handleSearchClick() {
        console.log(selectedSentiment)
    }

    const inputStyle = { 
        width: "100%",
        padding: "0.375rem 0.75rem",
        margin: "8px 0",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box"
      }

    return (
        <div className="advanced-search-panel">
            <h2><u>Advanced Search</u></h2>
            <Form style={{width: "70%"}}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Text:</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Enter text"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Topic (Events, Names, Etc.):</Form.Label>
                    <Col sm="10">
                        <Chips 
                            value={topics}
                            onChange={(topics) => setTopics(topics)}
                            createChipKeys={["Enter"]}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Sentiment:</Form.Label>
                    <Col sm="10">
                        <Select 
                            options={sentiments}
                            onChange={(option) => setSelectedSentiment(option.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Location:</Form.Label>
                    <Col sm="10">
                        <Autocomplete
                            items={locations}
                            wrapperStyle={{style: inputStyle}}
                            inputProps={{style: inputStyle}}
                            onChange={fetchLocations}
                            value={location}
                            getItemValue={item => item._source.geo}
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                  {item._source.geo}
                                </div>
                              }
                            onSelect={location => setLocation(location)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Start Date:</Form.Label>
                    <Col sm="10">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">End Date:</Form.Label>
                    <Col sm="10">
                    <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                    </Col>
                </Form.Group>
                <Button onClick={handleSearchClick}>Advanced Search</Button>
            </Form>
        </div>
    )
}

export default AdvancedSearchPanel;