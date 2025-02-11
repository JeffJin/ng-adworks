export interface AudioDto extends EntityDto {
  encodedFilePath: string;
  cloudUrl: string;
  duration: number;
  category: string;
  type: string;
  title: string;
  description: string;
  tags: string;
}

export interface DeviceDto extends EntityDto {
  serialNumber: string;
  deviceGroupName: string;
  organizationName: string;
  assetTag: string;
  deviceVersion: number;
  appVersion: number;
  locationId: string;
  activatedOn?: Date;
  lastStatus?: DeviceStatusDto;
  isOnline?: boolean;
  licenses?: Array<LicenseDto>;
}

export interface LicenseDto extends EntityDto {
  deviceId: string;
  type: string;
  expireOn: Date;
}


export interface DeviceStatusDto extends EntityDto {
  deviceId: string;
  status: string;
}

export interface GroupDto extends EntityDto {
  name: string;
  numOfDevices?: number;
  numOfPlaylists?: number;
}

export interface PlaylistDto extends EntityDto {
  name: string;
  startDate: Date;
  endDate: Date;
  // daily start and end time in minutes, offset from midnight
  startTime: number;
  endTime: number;
  deviceGroups: GroupDto[];
  subPlaylists: SubPlaylistDto[];
}


export interface SubPlaylistDto extends EntityDto {
  playlistId: string;
  positionX: number; // top left corner in a screen
  positionY: number; // top left corner in a screen
  width: number; // 0 to 100 percentage
  height: number; // 0 to 100 percentage
  playlistItems: PlaylistItemDto[];
}

export interface PlaylistItemDto extends EntityDto {
  index: number;
  subPlaylistId: string;
  mediaAssetId: string; // media asset id
  assetDiscriminator: string; // Video, Audio or Image
  duration: number; // for how long the asset will be displayed since the media start time
  media: any;

  cacheLocation: string;
}

export interface CustomerDto extends EntityDto {
  name: string;
}

export interface LocationDto extends EntityDto {
  address: string;
  locale: string;
  timezoneOffset: number;
}

export interface PlaylistGroupDto extends EntityDto {
  playlistId: string;
  groupId: string;
}

export interface ImageDto extends EntityDto {
  encodedFilePath: string;
  cloudUrl: string;
  category: string;
  type: string;
  title: string;
  description: string;
  tags: string;
}

export interface VideoDto extends EntityDto {
  cloudUrl: string;
  encodedFilePath: string;
  progressiveUrl: string;
  hlsUrl: string;
  duration: number;
  sourceId: string;
  sourceType: string;
  category: string;
  type: string;
  title: string;
  description: string;
  tags: string;
  mainThumbnail: string;
  thumbnails: string[];
  checked?: boolean;
  assetType?: string;
}

export interface UserDto{
  userName: string;
  email: string;
  phoneNumber: string;
  token?: string;
}

export class EntityDto{
  id?: string;
  createdOn?: Date;
  updatedOn?: Date;
  createdBy?: string;
  updatedBy?: string;
}
