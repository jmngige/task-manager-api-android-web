class apifilters {
    constructor(query, querystr){
        this.query = query
        this.querystr = querystr
    }

    filter(){
        const querycopy = { ...this.querystr }

        // const removefields = ['sort','select']
        // removefields.forEach(el => delete querycopy(el))

        let rawquery = JSON.stringify(querycopy)
        rawquery = rawquery.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`)
        this.query = this.query.find(JSON.parse(rawquery))

        return this
    }


    sort(){
        if(this.querystr.sort){
            const sortBy = this.querystr.sort.split(',').join("")
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('createdAt')
        }
        return this
    }

    select(){
        if(this.querystr.select){
            const selected = this.querystr.select.split(',').join('')
            this.query = this.query.select(selected)
        }else{
            this.query = this.query.select()
        }
        return this
    }

    paginate(){
        const page = parseInt(this.querystr.page, 10) || 1
        const limit = parseInt(this.querystr.limit, 10) || 10

        const startIndex = (page - 1) * limit
        // const endIndex = page * limit

        // results.next = {
        //     page: page + 1,
        //     limit: limit
        // }

        // results.previous = {
        //     page: page - 1,
        //     limit: limit
        // }

        // const results = {}
        // results.results = this.query.slice(startIndex, endIndex)
          

        this.query = this.query.skip(startIndex).limit(limit)
        return this
    }
}

module.exports = apifilters