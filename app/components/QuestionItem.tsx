import { Box, Text } from "@chakra-ui/react";
import { QuestionMetadata } from "lib/type";

export default function QuestionItem({
    question,
    isAnswerVisible,
}: {
    question: QuestionMetadata;
    isAnswerVisible: boolean;
}) {
    return (
        <Box>
            <Text>{question.question}</Text>
            {isAnswerVisible && (
                <Text style={{ color: "green", fontWeight: "bold" }}>
                    Answer: {question.answer}
                </Text>
            )}
        </Box>
    );
}
