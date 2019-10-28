let _enemyProjectiles = [];

class EnemyProjectile {
    static get list() {
        return _enemyProjectiles;
    }

    constructor(x, y) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/enemyShoot.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x - 50, y);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 10, 10);

        this.speed = 10;
        EnemyProjectile.list.push(this);

        stage.addChild(this.sprite);
    }

    destroy() {
        this.sprite.destroy();
    }

    update(idx) {
        this.sprite.position.x -= this.speed;
        this.sprite.hitArea.x = this.sprite.position.x;

        if (this.sprite.position.x > renderer.width * 1.1) {
            this.sprite.destroy();
            EnemyProjectile.list.splice(idx, 1);
        }
    }

    static destroyAll() {
        EnemyProjectile.list.forEach((projectile, index) => {
            projectile.destroy();
            EnemyProjectile.list.splice(index, 1);
        });
    }
}
