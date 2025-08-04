import {ColorService} from './color.service';
import {ImageService} from './image.service';
import {QuoteService} from './quote.service';
import {SpotifyService} from './spotify.service';

export class MoodService {
  constructor(
    private colorService: ColorService,
    private imageService: ImageService,
    private quoteService: QuoteService,
    private spotifyService: SpotifyService
  ) {}

  async loadMoodData(mood: string) {
    const [colors, imageUrl, quoteData] = await Promise.all([
      this.colorService.getColorsByMood(mood),      // string[]
      this.imageService.getImageByMood(mood),      // string
      this.quoteService.getQuote()                 // { quote: string, author: string } | null
    ]);

    const playlist = await this.spotifyService.getTopTrack('53XhwfbYqKCa1cC15pYq2q');

    return {
      mood,
      colors: colors ?? [],
      imageUrl: imageUrl ?? '',
      quote: quoteData?.quote ?? '',
      author: quoteData?.author ?? '',
      playlistUrl: playlist?.url ?? '',
      playlistName: playlist?.name ?? ''
    };
  }
}
