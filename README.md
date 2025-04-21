First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Example api call you can paste in the console:

```js
(async () => {
  const { bannerData } = await fetch('https://marketing-banner-yb-test.vercel.app/api/banner-data').then(res => res.json());
  console.log(bannerData[0].fields);
})();
```
