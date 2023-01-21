export interface Comment {
    id: number;
    postId: number;
    authorId: number;
    text: string;
    timestamp: Date;
    upvotes: number;
    reports: number;


}