import moment from "moment";

export function formatDate1(dateStr) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

export function formatDate2(dateString) {
  const date = moment.utc(dateString).local().toDate();
  return moment(date).format("YYYY-MM-DD");
}
