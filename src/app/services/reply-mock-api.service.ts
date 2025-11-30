import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReplyMockApiService {
    // Mock titles pool
    private readonly mockTitles = [
      'Understanding Quantum Computing',
      'Exploring Machine Learning Basics',
      'Web Development Best Practices',
      'Data Structures and Algorithms',
      'Cloud Architecture Patterns',
      'Design System Fundamentals',
      'API Integration Guide',
      'Database Optimization',
      'Security Best Practices',
      'Performance Tuning Tips'
    ];

 // Mock answer that will be returned for any question
 private readonly mockAnswer = `This is a mock response generated for demonstration purposes. The AI assistant would typically provide a detailed, contextual answer based on your question. In a real implementation, this would be replaced with actual AI model responses from providers like OpenAI, Azure, or Vertex AI.

 Key points to consider:
 - This response is generated using mock data
 - In production, this would connect to actual AI services
 - The response format can be customized based on your needs
 - You can extend this to include streaming responses, markdown formatting, and more
 
 Feel free to ask follow-up questions or explore different topics!`;
 
   // Mock providers and models
   private readonly providers = ['Azure', 'OpenAI', 'Vertex AI'];
   private readonly models = ['GPT-4 Turbo', 'GPT-4.1', 'Gemini 1.5 Pro'];
 

   generateTitle(): Observable<string> {
    const randomTitle = this.mockTitles[Math.floor(Math.random() * this.mockTitles.length)];
    return of(randomTitle).pipe(delay(500));
  }

  getAnswer(question: string): Observable<string> {
    return of(this.mockAnswer).pipe(
      delay(800 + Math.random() * 700)
    );
  }

  streamAnswerSimple(question: string): Observable<string> {
    const fullText = this.mockAnswer;
    const words = fullText.split(' ');
    
    return new Observable<string>(observer => {
      setTimeout(() => {
        let accumulated = '';
        let index = 0;
        
        const streamInterval = setInterval(() => {
          if (index < words.length) {
            accumulated += (index === 0 ? '' : ' ') + words[index];
            observer.next(accumulated);
            index++;
          } else {
            observer.complete();
            clearInterval(streamInterval);
          }
        }, 50);
      }, 800);
    });
  }


  getRandomProviderAndModel(): { provider: string; model: string } {
    const provider = this.providers[Math.floor(Math.random() * this.providers.length)];
    const model = this.models[Math.floor(Math.random() * this.models.length)];
    return { provider, model };
  }
 
}
