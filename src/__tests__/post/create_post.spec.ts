import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { MediaProxyInMemory } from "../../__in_memory__/MediaProxyInMemory";
import { IPostRepository } from "../../repositories/interface/IPostRepository";
import { PostRepositoryInMemory } from "../../__in_memory__/PostRepositoryInMemory";
import { CreatePostUseCase } from "../../useCases/post/create/CreatePostUseCase";

describe("Create Doctor", () => {
    let mediaProxyInMemory: MediaProxyInMemory | null;
    let postRepositoryInMemory: IPostRepository | null;

    let createPostUseCase: CreatePostUseCase | null;

    beforeEach(() => {
        postRepositoryInMemory = new PostRepositoryInMemory();
        mediaProxyInMemory = new MediaProxyInMemory();
        createPostUseCase = new CreatePostUseCase(
            postRepositoryInMemory,
            mediaProxyInMemory,
        );
    });
    afterEach(() => {
        postRepositoryInMemory = null;
        mediaProxyInMemory = null;
        createPostUseCase = null;
    });

    test("should be able create an post", async () => {
        const expectedId = "d3b8bbbf-d91f-4c1e-a639-6f2715d60899";
        let post = {
            id: expectedId,
            conteudo: "conteudo de uma postagem...",
            tags: "tag1;tag2;tag3",
            vits: "2/0",
            medicoId: "d3b8bbbf-d91f-4c1e-a639"
        }
        const result = await createPostUseCase?.execute(post)
        console.log('result => ', result)
    })    
})