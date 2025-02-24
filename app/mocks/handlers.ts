import { http, HttpResponse } from "msw";
// import { LiveStorage } from "@mswjs/storage";
// import { nanoid } from "nanoid";

export const handlers = [
  // 1. 사용자 정보 조회
  http.get("/user", () => {
    return HttpResponse.json({
      // id: nanoid(),
      id: "test-id",
      firstName: "John",
      lastName: "Maverick",
      age: 30,
      retirementAge: 60,
      investmentStyle: "balanced", // 안정형(stable) / 균형형(balanced) / 공격형(aggressive)
    });
  }),
];
