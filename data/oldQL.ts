import { useMutation, useQuery } from "@tanstack/react-query";
import config from "./config";
import faunadb from "faunadb";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCreatePostMutation } from "../pages/AddPost/data/createPost.generated";

export const queryClient = new QueryClient();

const q = faunadb.query;

const client = new faunadb.Client({
  secret: "fnADh_3JLaACAFmN7HAal6Nwe5y9CO-upQyWgSkG",
});

const getAllMedia = async () => {
  const allMedia = await client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_media"))))
    .then(async (response: any) => {
      const mediaRefs = response.data;
      // console.log("Media refs", mediaRefs);
      // console.log(`${mediaRefs.length} pieces of media found`);

      const getAllMediaDataQuery = mediaRefs.map((ref: any) => {
        return q.Get(ref);
      });
      // then query the refs
      const allMediaData = await client.query(getAllMediaDataQuery);
      // console.log("allMediaData", allMediaData);
      return allMediaData;
    })
    .catch((error) => {
      console.log("error", error);
      return [];
    });

  return allMedia;
};

export const useAllMedia = () => {
  return useQuery({
    queryKey: ["allMedia"],
    queryFn: () => getAllMedia(),
  });
};

export const useCreateMedia = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMedia"] });
    },
    mutationFn: async ({ file, user }: { file: any; user: any }) => {
      try {
        const url = `https://api.cloudinary.com/v1_1/${config.cloud_name}/upload`;

        const data = new FormData();

        data.append("upload_preset", config.upload_preset);
        data.append("file", {
          uri: file.uri,
          type: "image/jpeg",
          name: file.name,
        });
        // data.append("tags", file.place);
        // data.append("context", `photo=${file.name}`);
        console.log("data", data);
        // console.log("creating media cloudinary", url);

        const { data: cloudinaryData } = await axios.post(url, data);

        console.log("cloudinaryData", cloudinaryData);
        console.log("file", file);
        const post = {
          userId: user.id,
          tags: cloudinaryData.tags,
          photoURL: cloudinaryData.url,
          // width: cloudinaryData.width,
          // height: cloudinaryData.height,
          caption: "",
          location: {
            latitude: file.location.coords.latitude,
            longitude: file.location.coords.longitude,
          },
        };
        await queryClient.fetchQuery(
          useCreatePostMutation.getKey(),
          useCreatePostMutation.fetcher(post)
        );
      } catch (error) {
        console.log("error", error);
        throw error;
      }
      return;
    },
  });
};
