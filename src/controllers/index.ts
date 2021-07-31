import { Request, Response } from 'express';
import connection from '../database/DatabaseConfig';
import { GetCompanyData } from '../interfaces';

// 1. Get all countries data
export const getAllCountries = async (
  request: Request,
  response: Response,
): Promise<void> => {
  connection.query('SELECT id, name, year FROM mytable', function(err, result) {
    if (err) throw err;

    const categoryPosts = result.reduce((acc: any, post: GetCompanyData) => {
      const { id, name, year, category } = post;
      return { ...acc, [name]: [...(acc[name] || []), year] };
    }, {});

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

    response.status(200).json({
      categoryPosts,
    });
  });
};
