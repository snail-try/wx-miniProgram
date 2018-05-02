import utils from "../utils/utils.js";

class Movie {
  constructor() {
    this.casts = []; //演员整容
    this.commentsCount = 0; //  评论数
    this.countries = ""; // 国家
    this.genres = []; //流派
    this.id = "";
    this.thumbImg = "";
    this.title = "";
    this.average = null;
    this.year = "不详";
    this.directors = "";
    this.summary = "";
  }

  fromDouban(obj) {
    let { casts, comments_count, countries, genres, id, images, title, rating, year, directors, summary } = obj;
    if (!!casts && casts.length > 0) {
      this.casts = casts.map(item => {
        let { avatars, name } = item;
        return { thumbImg: !!avatars ? avatars.large : "", name };
      })
    }

    this.commentsCount = comments_count ? comments_count : 0;
    this.countries = !!countries && Array.isArray(countries) ? countries.join() : "";
    this.genres = !!genres ? genres : [];
    this.id = !!id ? id : utils.getRandromStr();
    this.thumbImg = images.large;
    this.title = title;
    this.average = rating && rating.average!=0 ? { stars: this.value2starInfo(rating.average, 5, 10), value: rating.average } : null;
    this.year = year ? year : "不详";
    this.directors = !!directors ? this.assembleDirectors(directors):"";
    this.summary = summary;
  }

  value2starInfo(value, starNum, maxValue) {
    let interval = maxValue / starNum, ary = new Array(starNum);
    ary.fill(0, 0, starNum);
    for (let i = 0; i < starNum; i++) {
      if ((i + 1) * interval <= value) {
        ary[i] = 1;
      } else if (i * interval < value && (i + 1) * interval > value) {
        ary[i] = 0.5;
      } else {
        break;
      }
    }
    return ary;
  }

  assembleDirectors(ary){
    if(!Array.isArray(ary) && ary.length>0) return;
    let result = ary.map(item=>item.name);
    return result.join("/")
  }
}

export default Movie;