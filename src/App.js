import { Routes, Route } from "react-router-dom";
import { Box, Center, Heading } from "@chakra-ui/react";
import Detail from "./Detail";
import Home from "./Home";

const App = () => {
    const MyRouter = () => (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card/:id" element={<Detail />} />
            <Route
                path="*"
                element={
                    <Center h="80vh">
                        <Box textAlign="center">404 Page not found!</Box>
                    </Center>
                }
            />
        </Routes>
    );

    return (
        <div className="App">
            <Box w="100vw" bg="#b25819" p={6}>
                <Center>
                    <Heading as="h1" color="#e2ded5">
                        Yugi-Oh Card Deck
                    </Heading>
                </Center>
            </Box>

            <MyRouter />
        </div>
    );
};

export default App;
