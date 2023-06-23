export interface PokemonListResponse {
	count: number;
	next: string;
	previous: null;
	results: BasicPokemonInfo[];
}

export interface BasicPokemonInfo {
	name: string;
	url: string;
}
