const chalk = require('chalk');

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.limit = this.queryStr.limit || 10;
    }

    filter() {
        let queryObj = { ...this.queryStr };
        let excludeFields = ['page', 'sort', 'limit', 'fields', 'search', 'skip'];
        excludeFields.forEach(key => delete queryObj[key]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        queryObj = JSON.parse(queryStr);
        console.log(chalk.bgRed(queryObj));
        this.query = this.query.find(queryObj);
        return this;
    }

    fields() {
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.replace(',', ' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.replace(',', ' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('price');
        }
        return this;
    }

    paginate() {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    search() {
        if (this.queryStr.search) {
            const searchQuery = this.queryStr.search;
            this.query = this.query.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            });
        }
        return this;
    }
}
  
module.exports = ApiFeatures;