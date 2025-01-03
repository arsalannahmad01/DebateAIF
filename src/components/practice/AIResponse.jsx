const AIResponse = ({ message, isStreaming }) => {
  return (
    <div className="flex items-start">
      <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow-sm">
        <p className="text-gray-800 leading-relaxed">
          {message.content}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-blue-500 animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
};

export default AIResponse; 