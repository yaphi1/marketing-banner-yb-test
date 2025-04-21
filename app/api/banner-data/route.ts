import { AIRTABLE_TOKEN } from '@/secrets/airtable_token';
import Airtable, { FieldSet, Record } from 'airtable';

const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base('appZPplPZ5Q1i29h1');

async function getBannerData() {
  const bannerData = await new Promise((resolve, reject) => {
    let banners: Array<Record<FieldSet>> = [];

    base('Banner Schedule').select({
      view: 'Grid view'
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      records.forEach(function(record) {
        banners.push(record);
      });
  
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); reject(); }
      resolve(banners);
    });
  });

  return bannerData;
}

export async function GET() {
  const bannerData = await getBannerData();

  return Response.json({ bannerData });
}
