import { motion } from 'framer-motion';

const AIResponse = ({ message, isStreaming }) => {
  // Function to process text and convert markdown-style formatting
  const processContent = (content) => {
    // Split content into paragraphs
    const paragraphs = content.split('\n\n');

    return paragraphs.map((paragraph, pIndex) => {
      // Process bold text within each paragraph
      const parts = [];
      let lastIndex = 0;
      let boldRegex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(paragraph)) !== null) {
        // Add text before the bold part
        if (match.index > lastIndex) {
          parts.push({
            type: 'text',
            content: paragraph.slice(lastIndex, match.index)
          });
        }

        // Add the bold text
        parts.push({
          type: 'bold',
          content: match[1] // The text between **
        });

        lastIndex = match.index + match[0].length;
      }

      // Add any remaining text after the last bold part
      if (lastIndex < paragraph.length) {
        parts.push({
          type: 'text',
          content: paragraph.slice(lastIndex)
        });
      }

      // If no bold parts were found, add the whole paragraph as regular text
      if (parts.length === 0) {
        parts.push({
          type: 'text',
          content: paragraph
        });
      }

      return (
        <p key={pIndex} className="mb-4 last:mb-0">
          {parts.map((part, index) => (
            part.type === 'bold' ? (
              <span key={index} className="font-bold">
                {part.content}
              </span>
            ) : (
              <span key={index}>{part.content}</span>
            )
          ))}
        </p>
      );
    });
  };

  return (
    <div className="flex items-start space-x-4">
      <motion.div
        className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-xl"
        whileHover={{ scale: 1.1 }}
      >
        🤖
      </motion.div>
      
      <div className="flex-1 bg-gray-100 p-4 rounded-lg">
        <div className="text-gray-800">
          {processContent(message.content)}
          {isStreaming && (
            <span className="inline-block w-1 h-4 ml-1 bg-gray-500 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResponse; 