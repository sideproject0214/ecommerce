import { useGetPostsPaginationQuery } from "../../redux/apiSlices/extendedPost";
import { Helmet } from "react-helmet";
import Body from "./Body";
import Carousel from "./Carousel";
import HomeScreenLoading from "./HomeScreenLoading";

export default function () {
  const { data, isLoading } = useGetPostsPaginationQuery(0);

  return isLoading ? (
    <HomeScreenLoading />
  ) : (
    <>
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>홈 | Ecommerce</title>
      </Helmet>
      <Carousel posts={data} />
      <Body />
    </>
  );
}
