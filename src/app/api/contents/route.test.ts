import { faker } from "@faker-js/faker";

import { GET } from "./route";

function mockContents() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: faker.string.uuid(),
    imageUri: faker.image.avatar(),
    metadata: {
      priority: faker.number.int({ min: 0, max: 100 }),
      publishDate: faker.date.past({ years: 1 }).toISOString(),
    },
    comments: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      (_) => ({
        text: faker.lorem.sentence(),
        likes: faker.number.int({ min: 0, max: 100000 }),
        profilePic: faker.image.avatar(),
        author: faker.person.fullName(),
      })
    ),
    textData: {
      author: {
        first: faker.person.firstName(),
        last: faker.person.lastName(),
      },
      body: faker.lorem.paragraph(),
      title: faker.lorem.sentence(),
      subTitle: faker.lorem.sentence(),
    },
  }));
}

describe("GET", () => {
  const mockedContents = mockContents();
  beforeAll(() => {
    process.env.API_HOST = "https://api.example.com";
    process.env.HOST = "https://example.com";
    global.fetch = async () =>
      ({
        ok: true,
        json: async () => {
          return { contentCards: mockedContents };
        },
      }) as any;

    global.Response = {
      json: (data: any) => data,
    } as any;
  });

  it("should return a list of contents", async () => {
    const response = (await GET()) as unknown as {
      success: boolean;
      data: any[];
    };
    expect(response.success).toBe(true);

    const contentFromMockedData = mockedContents.find(
      (content) => content.id === response.data[0].id
    );
    expect(contentFromMockedData).toBeDefined();
    if (!contentFromMockedData) return;
    expect(response.data[0].content).toBe(contentFromMockedData.textData.body);
    expect(response.data[0].title).toBe(contentFromMockedData.textData.title);
    expect(response.data[0].username).toBe(
      `${contentFromMockedData.textData.author.first} ${contentFromMockedData.textData.author.last}`
    );
  });

  it("should fail and return an empty list", async () => {
    global.fetch = async () =>
      ({
        ok: true,
        json: async () => {
          return {
            contentCards: [
              {
                id: "123",
                metadata: {
                  publishDate: "2022-01-01T00:00:00Z",
                },
                first: "John",
                last: "Doe",
              },
            ],
          };
        },
      }) as any;

    const response = (await GET()) as unknown as {
      success: boolean;
      reason: string;
      data: any[];
    };
    expect(response.success).toBe(false);
    expect(response.reason).toBe("invalid_data_from_api");
    expect(response.data.length).toBe(0);
  });

  it("should fail when parsing of json fails", async () => {
    global.fetch = async () =>
      ({
        ok: true,
        json: async () => {
          throw new Error("error");
          return;
        },
      }) as any;

    const response = (await GET()) as unknown as {
      success: boolean;
      reason: string;
      data: any[];
    };
    expect(response.success).toBe(false);
    expect(response.reason).toBe("invalid_data_from_api");
    expect(response.data.length).toBe(0);
  });

  it("should fail when invalid data", async () => {
    global.fetch = async () =>
      ({
        ok: false,
        json: async () => {
          throw new Error("error");
          return;
        },
      }) as any;

    const response = (await GET()) as unknown as {
      success: boolean;
      reason: string;
      data: any[];
    };
    expect(response.success).toBe(false);
    expect(response.reason).toBe("no_data");
    expect(response.data.length).toBe(0);
  });
});
