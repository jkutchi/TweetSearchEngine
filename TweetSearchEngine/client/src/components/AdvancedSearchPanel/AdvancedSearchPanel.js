import Select from 'react-select';
import React, { useState } from 'react';
import "./AdvancedSearchPanel.css";
import {Form, Row, Col} from "react-bootstrap";
import Chips from "react-chips";

function AdvancedSearchPanel() {

    const sentiments = [
        { value: "POSITIVE", label: "Positive" },
        { value: "NEGATIVE", label: "Negative" }
    ];

    const [selectedSentiment, setSelectedSentiment] = useState("");
    const [topics, setTopics] = useState([]);

    function handleSearchClick() {
        console.log(selectedSentiment)
    }

    return (
        <div className="advanced-search-panel">
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
                <button onClick={handleSearchClick}>Advanced Search</button>
            </Form>
        </div>
    )
}

export default AdvancedSearchPanel;