import React, { useState } from "react";
import { Container, Text, VStack, Button, Input, Textarea, IconButton, Box } from "@chakra-ui/react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { franc } from "franc-min";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

const Index = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [sentimentScore, setSentimentScore] = useState(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const analyzeText = () => {
    const detectedLanguage = franc(text);
    setLanguage(detectedLanguage);
    const result = sentiment.analyze(text);
    setSentimentScore(result.score);
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setText(transcript);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Mental Health Detector</Text>
        <Textarea value={text} onChange={handleTextChange} placeholder="Type or speak your text here..." size="md" />
        <Box>
          <IconButton aria-label="Start" icon={<FaMicrophone />} size="lg" onClick={startListening} isDisabled={listening} />
          <IconButton aria-label="Stop" icon={<FaStop />} size="lg" onClick={stopListening} isDisabled={!listening} />
        </Box>
        <Button onClick={analyzeText} colorScheme="teal">
          Analyze
        </Button>
        {language && <Text>Detected Language: {language}</Text>}
        {sentimentScore !== null && <Text>Sentiment Score: {sentimentScore}</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
