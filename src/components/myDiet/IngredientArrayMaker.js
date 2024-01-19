//1.하나만받아서 배열로 파싱 이후 배열로 리턴
export function IngredientArrayMaker(ingre){

  let str = ingre
  let res = "";

  //정규식활용
  res = str.replace(/\([^)]*\)/g, '');
  res = res.replace(/-[^-]*-/g, '');
  res = res.split(",");
  res = res.map(item => item.trim());
  //res.map((s)=>console.log(s));
  
  //중복제거추가
  res = new Set(res);
  res =  [...res];

  return res;
}


//2.여러개의 argument를 받아서 파싱이후 하나의배열로
export function IngredientsArrayMaker(){
  let res = [];
  for (let i = 0; i < arguments.length; i++) {
    let str = arguments[i]
    str = str.replace(/\([^)]*\)/g, '');
    str = str.replace(/-[^-]*-/g, '');
    str = str.split(",");
    str = str.map(item => item.trim());
    res = [...res, ...str];
  }

  //중복제거추가
  res = new Set(res);
  res =  [...res];

  return res;
}

//일반함수는 arguments객체 사용가능, 화살표함수는 안됨
//화살표함수는 가변인자로 여러argument를 받아야함
//-----------------------------------------------예시
// export const IngredientListtMaker = (...ingredients) => {
//   let res = [];

//   ingredients.forEach(str => {
//     str = str.replace(/\([^)]*\)/g, '');
//     str = str.replace(/-[^-]*-/g, '');
//     str = str.split(",");
//     str = str.map(item => item.trim()).filter(item => item !== '');
//     res = [...res, ...str];
//   });

//   return res;
// };
