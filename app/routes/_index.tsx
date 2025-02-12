import {
    Box,
    Button,
    Center,
    ClientOnly,
    HStack,
    Heading,
    SimpleGrid,
    Skeleton,
    Text,
    VStack,
} from "@chakra-ui/react";
import type { MetaFunction } from "@remix-run/node";
import { QuestionMetadata, ShapeMetadata } from "lib/type";
import { generateRandomColor, shuffleArray } from "lib/util";
import {
    Circle,
    Diamond,
    Heart,
    Hexagon,
    Pentagon,
    RectangleHorizontal,
    Square,
    Star,
    Triangle,
} from "lucide-react";
import { Fragment, useState } from "react";
import QuestionItem from "~/components/QuestionItem";
import { ColorModeToggle } from "~/components/ui/color-mode-toggle";

export const meta: MetaFunction = () => {
    return [
        { title: "Shapes & Colors Quiz" },
        {
            name: "description",
            content: "Game to test your knowledge of shapes and colors.",
        },
    ];
};

export default function Index() {
    const [shapes, setShapes] = useState<ShapeMetadata[]>([]);
    const [questions, setQuestions] = useState<QuestionMetadata[]>([]);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    const easyShapes: ShapeMetadata[] = [
        {
            name: "circle",
            label: "Circle",
            icon: Circle,
            color: generateRandomColor(),
        },
        {
            name: "square",
            label: "Square",
            icon: Square,
            color: generateRandomColor(),
        },
        {
            name: "triangle",
            label: "Triangle",
            icon: Triangle,
            color: generateRandomColor(),
        },
    ];

    const mediumShapes: ShapeMetadata[] = [
        {
            name: "rectangle",
            label: "Rectangle",
            icon: RectangleHorizontal,
            color: generateRandomColor(),
        },
        {
            name: "diamond",
            label: "Diamond",
            icon: Diamond,
            color: generateRandomColor(),
        },
        {
            name: "heart",
            label: "Heart",
            icon: Heart,
            color: generateRandomColor(),
        },
        {
            name: "Star",
            label: "star",
            icon: Star,
            color: generateRandomColor(),
        },
    ];

    const hardShapes: ShapeMetadata[] = [
        {
            name: "Pentagon",
            label: "Pentagon",
            icon: Pentagon,
            color: generateRandomColor(),
        },
        {
            name: "Hexagon",
            label: "Hexagon",
            icon: Hexagon,
            color: generateRandomColor(),
        },
    ];

    function generateShapes(difficulty: "easy" | "medium" | "hard") {
        switch (difficulty) {
            case "easy":
                return shuffleArray(easyShapes);
            case "medium":
                return shuffleArray(mediumShapes);
            case "hard":
                return shuffleArray(hardShapes);
            default:
                return shuffleArray(easyShapes);
        }
    }

    function generateQuestions(difficulty: "easy" | "medium" | "hard") {
        const generatedShapes = generateShapes(difficulty);
        const pickedShapeQ1 =
            generatedShapes[Math.floor(Math.random() * generatedShapes.length)];
        const pickedShapeQ2 =
            generatedShapes[Math.floor(Math.random() * generatedShapes.length)];
        const q: QuestionMetadata[] = [
            {
                name: "q1",
                question: `Identify how many ${pickedShapeQ1.label} are there?`,
                answer: generatedShapes
                    .filter((shape) => shape.name === pickedShapeQ1.name)
                    .length.toString(),
            },
            {
                name: "q2",
                question: `Identify how many shapes in ${pickedShapeQ2.color} are there?`,
                answer: generatedShapes
                    .filter((shape) => shape.color === pickedShapeQ2.color)
                    .length.toString(),
            },
        ];
        setShapes(generatedShapes);
        setQuestions(q);
        setIsAnswerVisible(false);
    }

    return (
        <Box
            textAlign="center"
            fontSize={["lg", "xl", "2xl"]} // Adjust font size for different screen sizes
            pt={["10vh", "20vh", "30vh"]} // Adjust padding top for different screen sizes
        >
            <Box pos="absolute" top="4" right="4">
                <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                    <ColorModeToggle />
                </ClientOnly>
            </Box>
            {shapes &&
            shapes.length > 0 &&
            questions &&
            questions.length > 0 ? (
                <VStack spaceY={"4"}>
                    <Box>
                        <VStack>
                            <HStack
                                wrap={{ base: "wrap", md: "nowrap" }} // Wrap on small screens, no wrap on medium screens and above
                                justifyContent="center"
                            >
                                {shapes.map((shape, index) => (
                                    <shape.icon
                                        key={index}
                                        width={250}
                                        height={250}
                                        color={shape.color?.toLowerCase()}
                                    />
                                ))}
                            </HStack>
                            <Button onClick={() => setIsAnswerVisible(true)}>
                                Reveal Answers
                            </Button>
                            {questions.map((question) => (
                                <Fragment key={question.name}>
                                    <QuestionItem
                                        question={question}
                                        isAnswerVisible={isAnswerVisible}
                                    />
                                </Fragment>
                            ))}
                        </VStack>
                    </Box>
                    <Box>
                        <HStack>
                            <Button
                                backgroundColor={"green"}
                                onClick={() => generateQuestions("easy")}
                            >
                                Next Easy Quiz
                            </Button>
                            <Button
                                backgroundColor={"orange"}
                                onClick={() => generateQuestions("medium")}
                            >
                                Next Medium Quiz
                            </Button>
                            <Button
                                backgroundColor={"red"}
                                onClick={() => generateQuestions("hard")}
                            >
                                Next Hard Quiz
                            </Button>
                        </HStack>
                    </Box>
                </VStack>
            ) : (
                <VStack spaceY={"4"}>
                    <Heading size={"4xl"}>Choose Difficulty</Heading>
                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        justifyItems={"center"}
                    >
                        <Box
                            height={250}
                            width={250}
                            onClick={() => generateQuestions("easy")}
                            border="2px solid"
                            borderColor="gray.200" // Default border color
                            _hover={{
                                borderColor: "green.500", // Green border on hover
                                cursor: "pointer",
                            }}
                        >
                            <Center height="100%">
                                {" "}
                                {/* Center the text vertically and horizontally */}
                                <Text>Easy</Text>
                            </Center>
                        </Box>
                        <Box
                            height={250}
                            width={250}
                            onClick={() => generateQuestions("hard")}
                            border="2px solid"
                            borderColor="gray.200" // Default border color
                            _hover={{
                                borderColor: "orange.500", // Orange border on hover
                                cursor: "pointer",
                            }}
                        >
                            <Center height="100%">
                                {" "}
                                {/* Center the text vertically and horizontally */}
                                <Text>Medium</Text>
                            </Center>
                        </Box>
                        <Box
                            height={250}
                            width={250}
                            border="2px solid"
                            borderColor="gray.200" // Default border color
                            _hover={{
                                borderColor: "red.500", // Red border on hover
                                cursor: "pointer",
                            }}
                            onClick={() => generateQuestions("hard")}
                        >
                            <Center height="100%">
                                {" "}
                                {/* Center the text vertically and horizontally */}
                                <Text>Hard</Text>
                            </Center>
                        </Box>
                    </SimpleGrid>
                </VStack>
            )}
        </Box>
    );
}
