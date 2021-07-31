import { Request, Response } from 'express';
import connection from '../database/DatabaseConfig';
import { GetCompanyData, SetCompanyData } from '../interfaces';

// 1. Get all countries data
export const getAllCountries = async (
  request: Request,
  response: Response,
): Promise<void> => {
  connection.query('SELECT id, name, year FROM mytable', function(err, result) {
    if (err) throw err;

    // const categoryPosts = result.reduce((acc: any, post: GetCompanyData) => {
    //   const { id, name, year, category } = post;
    //   return { ...acc, [name]: [...(acc[name] || []), year] };
    // }, {});

    // const categoryPosts = result.reduce(function(
    //   acc: any,
    //   post: GetCompanyData,
    // ) {
    //   if (post.name === 'Australia') {
    //     acc.push({
    //       name: post.name,
    //       year: post.category,
    //     });
    //   }
    //   return acc;
    // },
    // []);

    const output: Array<object> = [];

    result.forEach(function(item: object) {
      const existing = output.filter(function(data, i) {
        return data.name == item.name;
      });
      // if (existing.length) {
      //   const existingIndex = output.indexOf(existing[0]);

      //   output[existingIndex].year = output[existingIndex].year
      //     .toString()
      //     .concat(item.year.toString());
      // } else {
      // if (typeof item.year == 'string') {
      //   item.year = [item.year];
      // }
      // output.push(item);
      // }

      // if (existing.length) {
      //   console.log('Exists');
      // } else {
      //   if (typeof item.year == 'string') {
      //     item.year = [item.year];
      //   }
      //   output.push(item);
      // }

      console.log(existing);
    });

    response.status(200).json({
      result,
    });
  });
};
