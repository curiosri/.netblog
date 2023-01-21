export interface Post {
    id: number;
    title: string;
    authorId: number;
    text: string;
    timestamp: Date;
    category: string;
    tags: string;
    hits: number;
    upvotes: number;
    reports: number;


}