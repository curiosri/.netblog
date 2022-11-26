export interface Post {
    id: number;
    title: string;
    authorId?: number;
    text: string;
    timestamp: Date;
    
}