import { Box, Image, Heading } from "@chakra-ui/react";

function Card({ card }) {
    return (
        <Box className="yugioh-card" w="200px" h="300px" borderRadius="10px" p={4}>
            <Image src={card.card_images[0].image_url} alt={card.name} />
            <Heading size="sm" as={"h2"} textAlign={"center"}>
                {card.name}
            </Heading>
        </Box>
    );
}

export default Card;
