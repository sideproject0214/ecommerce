const axios = require("axios");

const cheerio = require("cheerio");

exports.trackingLogenUtil = async (req, res) => {
  const { data } = await axios.get(
    `https://www.ilogen.com/web/personal/trace/${req.params.id}`,
    { responseType: "arraybuffer" }
  );

  const $ = new cheerio.load(data.toString());

  const tables = $("tbody");

  const informationTable = $(tables[0]);
  const progressTable = $(tables[1]);

  if (!progressTable) {
    return res.status(404).json({ message: "운송장 정보를 찾을 수 없습니다" });
  }

  let shippingInfo = {
    from: {
      name: informationTable
        .children("tr")
        .eq(3)
        .children("td")
        .eq(1)
        .text()
        .trim(),
      time: null,
    },
    to: {
      name: informationTable
        .children("tr")
        .eq(3)
        .children("td")
        .eq(3)
        .text()
        .trim(),
      time: null,
    },
    state: null,
    progresses: [],
  };

  const pasreStatus = (s) => {
    if (s.includes("터미널입고")) return { id: "at_pickup", text: "상품인수" };
    if (s.includes("배송출고"))
      return { id: "out_for_delivery", text: "배송출발" };
    if (s.includes("배송완료")) return { id: "delivered", text: "배송완료" };
    return { id: "in_transit", text: "이동중" };
  };

  const tdToDescription = (td) => {
    const headers = [
      "사업장",
      "배송상태",
      "배송내용",
      "담당직원",
      "인수자",
      "영업소",
    ];

    const tdDesc = headers
      .map((header, i) => {
        return $(td[i + 1])
          .text()
          .trim() !== ""
          ? `${header}: ${$(td[i + 1])
              .text()
              .trim()
              .replace(/\./g, "")}`
          : null;
      })
      .filter((obj) => obj !== null)
      .join(", ");

    return tdDesc;
  };

  const pushInfo = () => {
    progressTable.children("tr").each((index, element) => {
      const td = $(element).children("td");

      if (td.eq(0).text().trim() === "") {
        // 시간이 안들어있다는 것은 배송이 완료되었다는 의미
        return;
      }

      shippingInfo.progresses.push({
        time: `${td.eq(0).text().replace(/\./g, "-")}`,
        location: td.eq(1).text(),
        status: pasreStatus(td.eq(2).text()),
        description: tdToDescription(td),
      });
    });
  };

  pushInfo();

  // 현재 배송상태는 가장 마지막 상태 값을 넣어준다.
  shippingInfo.state =
    shippingInfo.progresses[shippingInfo.progresses.length - 1].status;

  // 처음시간은 진행상태의 첫 번째
  shippingInfo.from.time = shippingInfo.progresses[0].time;

  // to의 시간은 마지막 단계가 delievered일 경우임
  if (
    shippingInfo.progresses[shippingInfo.progresses.length - 1].status.id ===
    "delivered"
  ) {
    shippingInfo.to.time =
      shippingInfo.progresses[shippingInfo.progresses.length - 1].time;
  }

  // console.log(data.toString("utf-8"), "data");
  // const dom = new JSDOM(body.toString("utf-8"));
  // const nodeList = [...dom.window.document.querySelectorAll("tbody")];
  // console.log(nodeList[0], "dom");
  return shippingInfo;
};

exports.trackingLogenByNumber = (trackingNum) => {
  // console.log(trackingNum, "tracking");

  const mapResult = Promise.all(
    trackingNum.map(async (number) => {
      // console.log(number, "In map Number");
      const { data } = await axios.get(
        `https://www.ilogen.com/web/personal/trace/${number}`,
        { responseType: "arraybuffer" }
      );

      const $ = new cheerio.load(data.toString());

      const tables = $("tbody");
      // console.log(tables, "tables");
      const informationTable = $(tables[0]);
      const progressTable = $(tables[1]);

      let shippingInfo = {
        from: {
          name: informationTable
            .children("tr")
            .eq(3)
            .children("td")
            .eq(1)
            .text()
            .trim(),
          time: null,
        },
        to: {
          name: informationTable
            .children("tr")
            .eq(3)
            .children("td")
            .eq(3)
            .text()
            .trim(),
          time: null,
        },
        state: null,
        progresses: [],
      };

      const pasreStatus = (s) => {
        if (s.includes("터미널입고"))
          return { id: "at_pickup", text: "상품인수" };
        if (s.includes("배송출고"))
          return { id: "out_for_delivery", text: "배송출발" };
        if (s.includes("배송완료"))
          return { id: "delivered", text: "배송완료" };
        return { id: "in_transit", text: "이동중" };
      };

      const tdToDescription = (td) => {
        const headers = [
          "사업장",
          "배송상태",
          "배송내용",
          "담당직원",
          "인수자",
          "영업소",
        ];

        const tdDesc = headers
          .map((header, i) => {
            return $(td[i + 1])
              .text()
              .trim() !== ""
              ? `${header}: ${$(td[i + 1])
                  .text()
                  .trim()
                  .replace(/\./g, "")}`
              : null;
          })
          .filter((obj) => obj !== null)
          .join(", ");

        return tdDesc;
      };

      const pushInfo = () => {
        progressTable.children("tr").each((index, element) => {
          const td = $(element).children("td");

          if (td.eq(0).text().trim() === "") {
            // 시간이 안들어있다는 것은 배송이 완료되었다는 의미
            return;
          }

          shippingInfo.progresses.push({
            time: `${td.eq(0).text().replace(/\./g, "-")}`,
            location: td.eq(1).text(),
            status: pasreStatus(td.eq(2).text()),
            description: tdToDescription(td),
          });
        });
      };

      pushInfo();
      // console.log(shippingInfo, "shippingInfo");
      // 현재 배송상태는 가장 마지막 상태 값을 넣어준다.

      // console.log(
      //   shippingInfo.progresses[shippingInfo.progresses.length - 1].status,
      //   "shippingInfo.progresses[shippingInfo.progresses.length - 1].status"
      // );
      const shippingStatus =
        shippingInfo.progresses ??
        shippingInfo.progresses[shippingInfo.progresses.length - 1].status;
      const { text } = shippingStatus;

      if (shippingInfo.progresses.length !== 0) {
        shippingInfo.state =
          shippingInfo.progresses[shippingInfo.progresses.length - 1].status;
        shippingInfo.from.time = shippingInfo.progresses[0].time;
        shippingInfo.to.time =
          shippingInfo.progresses[shippingInfo.progresses.length - 1].time;
      } else {
        shippingInfo.state = "상품준비중";
        shippingInfo.from.time = "상품준비중";
        shippingInfo.to.time = "상품준비중";
      }

      return shippingInfo;
    })
  ).then((result) => result);
  // ).then((result) => result);

  // console.log(mapResult, "mapResult");

  return mapResult;
};

// exports.trackingLogenByNumber = async (number) => {
//   const { data } = await axios.get(
//     `https://www.ilogen.com/web/personal/trace/${number}`,
//     { responseType: "arraybuffer" }
//   );

//   const $ = new cheerio.load(data.toString());

//   const tables = $("tbody");

//   const informationTable = $(tables[0]);
//   const progressTable = $(tables[1]);

//   let shippingInfo = {
//     from: {
//       name: informationTable
//         .children("tr")
//         .eq(3)
//         .children("td")
//         .eq(1)
//         .text()
//         .trim(),
//       time: null,
//     },
//     to: {
//       name: informationTable
//         .children("tr")
//         .eq(3)
//         .children("td")
//         .eq(3)
//         .text()
//         .trim(),
//       time: null,
//     },
//     state: null,
//     progresses: [],
//   };

//   const pasreStatus = (s) => {
//     if (s.includes("터미널입고")) return { id: "at_pickup", text: "상품인수" };
//     if (s.includes("배송출고"))
//       return { id: "out_for_delivery", text: "배송출발" };
//     if (s.includes("배송완료")) return { id: "delivered", text: "배송완료" };
//     return { id: "in_transit", text: "이동중" };
//   };

//   const tdToDescription = (td) => {
//     const headers = [
//       "사업장",
//       "배송상태",
//       "배송내용",
//       "담당직원",
//       "인수자",
//       "영업소",
//     ];

//     const tdDesc = headers
//       .map((header, i) => {
//         return $(td[i + 1])
//           .text()
//           .trim() !== ""
//           ? `${header}: ${$(td[i + 1])
//               .text()
//               .trim()
//               .replace(/\./g, "")}`
//           : null;
//       })
//       .filter((obj) => obj !== null)
//       .join(", ");

//     return tdDesc;
//   };

//   const pushInfo = () => {
//     progressTable.children("tr").each((index, element) => {
//       const td = $(element).children("td");

//       if (td.eq(0).text().trim() === "") {
//         // 시간이 안들어있다는 것은 배송이 완료되었다는 의미
//         return;
//       }

//       shippingInfo.progresses.push({
//         time: `${td.eq(0).text().replace(/\./g, "-")}`,
//         location: td.eq(1).text(),
//         status: pasreStatus(td.eq(2).text()),
//         description: tdToDescription(td),
//       });
//     });
//   };

//   pushInfo();

//   // 현재 배송상태는 가장 마지막 상태 값을 넣어준다.
//   shippingInfo.state =
//     shippingInfo.progresses[shippingInfo.progresses.length - 1].status;

//   // 처음시간은 진행상태의 첫 번째
//   shippingInfo.from.time = shippingInfo.progresses[0].time;

//   // to의 시간은 마지막 단계가 delievered일 경우임
//   if (
//     shippingInfo.progresses[shippingInfo.progresses.length - 1].status.id ===
//     "delivered"
//   ) {
//     shippingInfo.to.time =
//       shippingInfo.progresses[shippingInfo.progresses.length - 1].time;
//   }

//   // console.log(data.toString("utf-8"), "data");
//   // const dom = new JSDOM(body.toString("utf-8"));
//   // const nodeList = [...dom.window.document.querySelectorAll("tbody")];
//   // console.log(nodeList[0], "dom");
//   return shippingInfo;
// };
