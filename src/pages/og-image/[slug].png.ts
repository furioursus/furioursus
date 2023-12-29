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
					viewBox="0 0 266.42 266.42"
				>
					<path
						d="m133.21,0C59.76,0,0,59.76,0,133.21s59.76,133.21,133.21,133.21,133.21-59.76,133.21-133.21S206.66,0,133.21,0Zm-39.97,159.94c-5.64,0-10.21-7.22-10.21-16.13,0-5.15,1.54-9.72,3.93-12.67l16.49,12.85c-.06,8.83-4.6,15.96-10.2,15.96Zm54.96-3.67c-4.89-.15-7.88-.44-9.41,3.86-1.53,4.3-5.58,5.18-5.58,5.18,0,0-4.05-.88-5.58-5.18-1.53-4.3-4.52-4.01-9.41-3.86-4.89.14-5.55-5.76.07-9.63,5.62-3.86,14.92-3.42,14.92-3.42,0,0,9.3-.44,14.92,3.42,5.62,3.87,4.96,9.78.07,9.63Zm24.95,3.67c-5.48,0-9.94-6.88-10.15-15.49l16.67-12.99c2.23,2.96,3.65,7.38,3.65,12.35,0,8.91-4.55,16.13-10.17,16.13Zm46.31,46.84c-9.16-28.66-17.94-55.49-21.2-73.45,0,0,4.72-.79,9.97-8,5.25-7.21.39-23.61-10.36-25.97-10.76-2.36-20.07,4.07-20.07,4.07,0,0-8.53-5.64-19.55-8.27-11.02-2.62-25.04-2.75-25.04-2.75,0,0-14.03.13-25.05,2.75-11.02,2.62-19.55,8.27-19.55,8.27,0,0-9.31-6.43-20.07-4.07-10.75,2.36-15.61,18.76-10.36,25.97,5.25,7.22,9.97,8,9.97,8-3.27,17.96-12.04,44.79-21.2,73.45-16.93-19.82-27.16-45.52-27.16-73.56,0-62.54,50.88-113.42,113.42-113.42s113.42,50.88,113.42,113.42c0,28.05-10.24,53.74-27.17,73.56Z"
						fill="currentColor"
						stroke-width="0"></path>
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
