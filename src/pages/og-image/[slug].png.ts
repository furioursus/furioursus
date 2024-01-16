import type { APIContext, GetStaticPaths } from "astro";
import { getEntryBySlug } from "astro:content";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from "@/site-config";
import { getAllBlogs, getFormattedDate } from "@/utils";

import MonoLisa from "@/assets/MonoLisa-Regular.ttf";
import MonoLisaBold from "@/assets/MonoLisa-Bold.ttf";

const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	// debug: true,
	fonts: [
		{
			name: "MonoLisa",
			data: Buffer.from(MonoLisa),
			weight: 400,
			style: "normal",
		},
		{
			name: "MonoLisa",
			data: Buffer.from(MonoLisaBold),
			weight: 700,
			style: "normal",
		},
	],
};

const markup = (title: string, pubDate: string) =>
	html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-2xl mb-6">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
			<div tw="flex items-center">
				<svg
					height="60"
					fill="none"
					aria-hidden="true"
					focusable="false"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="currentColor"
						stroke-width="0"
						d="M422.604 136.68a41.403 41.403 0 0 0-58.557.387l-16.454 16.672c-26.13-18.844-57.655-30.823-91.59-30.823-33.943 0-65.465 11.98-91.6 30.824l-16.45-16.673a41.407 41.407 0 0 0-58.947 58.165l20.83 21.112c-11.083 20.988-17.362 43.4-17.362 64.863 0 73.494 73.212 107.877 163.53 107.877S419.53 354.7 419.53 281.207c0-21.463-6.275-43.875-17.367-64.863l20.83-21.112a41.41 41.41 0 0 0-.391-58.552ZM265.45 347.846v-46.653h6.302a9.453 9.453 0 0 0 0-18.905h-31.5a9.453 9.453 0 1 0 0 18.905h6.297v46.653c-28.543-3.323-50.45-21.314-50.45-43.023 0-24.047 26.874-43.62 59.903-43.62 33.024 0 59.897 19.573 59.897 43.62-.004 21.71-21.906 39.7-50.449 43.023Zm-113.396-80.429a16.932 16.932 0 1 1 16.932-16.928 16.928 16.928 0 0 1-16.932 16.928Zm207.896 0a16.932 16.932 0 1 1 16.932-16.928 16.925 16.925 0 0 1-16.932 16.928Z"
					></path>
				</svg>
				<p tw="ml-3 font-semibold">${siteConfig.title}</p>
			</div>
			<p>by ${siteConfig.author}</p>
		</div>
	</div>`;

export async function GET({ params: { slug } }: APIContext) {
	const post = await getEntryBySlug("blog", slug!);
	const title = post?.data.title ?? siteConfig.title;
	const postDate = getFormattedDate(
		post?.data.updatedDate ?? post?.data.publishDate ?? Date.now(),
		{
			weekday: "long",
			month: "long",
		},
	);
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getAllBlogs();
	return posts.filter(({ data }) => !data.ogImage).map(({ slug }) => ({ params: { slug } }));
};
