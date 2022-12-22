import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Cards";
import { Container, SimpleGrid, Center, Select } from "@chakra-ui/react";

function Home() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4")
            .then((res) => res.json())
            .then((data) => {
                console.log('GET DATA');
                setCards(data.data);
                setLoading(false);
            });
    }, []);

    async function sortData(type) {
        const data = [...cards];

        if (type === 'name') {
            data.sort((a,b) => a.name.localeCompare(b.name));
        } else {
            data.sort((a, b) => a[type] - b[type]);
        }

        setCards(data);
    }

    return (
        <Container minW={"6xl"} marginTop="2" alignItems={"center"} display={"flex"} flexDir={"column"}>
            <Select name="sort" onChange={(e) => sortData(e.target.value)}>
                <option value="name">
                    Name
                </option>
                <option value="atk">
                    Attack
                </option>
                <option value="def">
                    Defence
                </option>
            </Select>

            {loading ? (
                <Center>
                    <h1>Loading...</h1>
                </Center>
            ) : (
                <SimpleGrid columns={"4"} id="cards-container">
                    {cards.map((card) => (
                        <Link to={`/card/${card.id}`} key={card.id}>
                            <Card card={card} />
                        </Link>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
}

export default Home;
