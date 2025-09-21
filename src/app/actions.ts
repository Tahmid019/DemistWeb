
'use server'

export async function getAiResponse(question: string, context: string): Promise<string> {
  // In a real application, you would use a language model to answer the question based on the context.
  // For this example, we'll use a simple placeholder.
  console.log('User Question:', question);
  console.log('Document Context:', context.substring(0, 100) + '...'); // Log first 100 chars

  // Simulate an AI response
  if (context) {
    return `Based on the document, here is a simulated answer to your question: "${question}". The document contains text.`;
  } else {
    return 'I see you haven\'t uploaded a document yet. Please upload a PDF to get started.';
  }
}
