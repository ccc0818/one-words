<template>
	<view class="home-container">
		<image :src="bgRef" mode="heightFix" class="bg"></image>
		<view class="words-container">
			<text class="words">
				{{ wordsRef }}\n
				<text class="author">{{ authorRef }}</text>
			</text>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getInfo } from '@/api';

const bgRef = ref<string>('');
const wordsRef = ref<string>('');
const authorRef = ref<string>('');

getInfo().then(res => {
	bgRef.value = res.image;
	wordsRef.value = res.words;
	authorRef.value = `--${res.author} 《${res.source}》`;
})

</script>

<style lang="scss" scoped>
.home-container {
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;

	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		pointer-events: none;
	}

	.words-container {
		$color: #fff;
		position: absolute;
		width: 100%;
		height: 50%;
		bottom: 0;
		backdrop-filter: blur(32px);
		box-sizing: border-box;
		padding: 40rpx;

		.words {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 80%;
			max-width: 80%;
			box-sizing: border-box;
			padding: 40rpx;
			writing-mode: vertical-rl;
			letter-spacing: 10rpx;
			font-size: 32rpx;
			line-height: 64rpx;
			color: $color;
			mix-blend-mode: difference;

			&::before,
			&::after {
				content: '';
				width: 30%;
				height: 50%;
				border: 4rpx solid $color;
				position: absolute;
			}

			&::before {
				border-left-color: transparent;
				border-bottom-color: transparent;
				top: 0;
				right: 0;
			}

			&::after {
				border-right-color: transparent;
				border-top-color: transparent;
				bottom: 0;
				left: 0;
			}

			.author {
				font-size: 24rpx;
				display: inline-block;
				height: 100%;
				text-align: right;
			}
		}
	}
}
</style>
