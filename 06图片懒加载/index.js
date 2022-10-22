const images = document.querySelectorAll('img');

/**
 * 写法一
 */
// window.addEventListener('scroll', e => {
//   images.forEach(image => {
//     // 每张图片到顶部的距离
//     const imageTop = image.getBoundingClientRect().top;
//     if (imageTop < window.innerHeight) {
//       const data_src = image.getAttribute('data-src');
//       image.setAttribute('src', data_src);
//     }
//   })
// })


/**
 * 写法二（更优雅）
 */
const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const data_src = image.getAttribute('data-src');
      image.setAttribute('src', data_src);
      observer.unobserve(image);
    }
  })
}

const observer = new IntersectionObserver(callback);
images.forEach(image => {
  observer.observe(image);
})