/**
 * 消息提示
 */
export const $toast = (title = '', duration = 1500, mask = true) => {
  return uni.showToast({
    title: title,
    mask: mask,
    icon: 'none',
    duration: duration,
  });
};
