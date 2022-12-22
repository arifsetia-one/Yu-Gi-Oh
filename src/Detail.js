import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Center, Button, Heading, Container, SimpleGrid, Text, Image } from "@chakra-ui/react";

function Detail() {
    const { id } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCard(data.data[0]);
                setLoading(false);
            });
    }, [id]);

    const navigate = useNavigate();

    if (loading) {
        return (
            <Center h="80vh">
                <h1>Loading...</h1>
            </Center>
        );
    }

    return (
        <Container display={"flex"} flexDir={"column"} rowGap="8" marginTop={8} minW={"8xl"} maxW={"80vw"}>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Box display={"flex"} gap={"2"}>
                <Image src={card.card_images[0].image_url} w="200px" h="300px" alt={card.name} />
                <Box>
                    <Heading as="h2" fontSize={"lg"}>
                        {card.name}
                    </Heading>
                    <Text fontWeight={"bold"}>Level: {card.level}</Text>
                    <Text fontWeight={"bold"}>{card.attribute}</Text>
                    <Text fontWeight={"bold"}>
                        ATK/{card.atk} DEF/{card.def}
                    </Text>
                    <Text>
                        [ {card.type} / {card.race} ]
                    </Text>
                    <Text>Description: {card.desc}</Text>
                </Box>
            </Box>
            <Center flexDir={"column"}>
                <Heading as="h2" fontSize={"md"} margin={"2"}>
                    Card Sets
                </Heading>
                <SimpleGrid columns={7} gap={2}>
                    {card.card_sets.map((set) => (
                        <Box key={set.set_name} border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                            <Text>Name: {set.set_name}</Text>
                            <Text>Code: {set.set_code}</Text>
                            <Text>Rarity: {set.set_rarity}</Text>
                            <Text>Price: {set.set_price}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Center>
        </Container>
    );
}

export default Detail;
