import "../scss/styles.scss";

// async를 크롬이 이해하지 못하므로
// polyfill을 설치해야한다.
const something = async () => {
  console.log("something");
};
