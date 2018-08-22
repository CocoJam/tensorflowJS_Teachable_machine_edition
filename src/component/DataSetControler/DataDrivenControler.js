import * as tf from "@tensorflow/tfjs";


class Controller{
    constructor(classNum){
        this.classNum = classNum;
    }
    addExample(example, label) {
        this.classNum++;
        const y = tf.tidy(() => tf.oneHot(tf.tensor1d([label]).toInt(), this.classNum));
        if (this.xs == null) {
          this.xs = tf.keep(example);
          this.ys = tf.keep(y);
        } else {
          const oldX = this.xs;
          this.xs = tf.keep(oldX.concat(example, 0));
          const oldY = this.ys;
          const zs = oldY.concat(tf.zeros([oldY.shape[0], 1]),1);
          this.ys = tf.keep(zs.concat(y, 0));
        
          zs.dispose();
          oldX.dispose();
          oldY.dispose();
          y.dispose();
        }
        // console.log(this.ys.shape)
        // console.log(this.xs.shape)
        window.xs = this.xs
        window.ys = this.ys
        // this.xs[this.xs.shape[0]].print();
      }
}

export default Controller;